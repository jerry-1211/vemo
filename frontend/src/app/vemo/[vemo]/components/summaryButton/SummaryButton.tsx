'use client';

import { useState } from 'react';
import { useSummary } from '../../context/SummaryContext';

export default function SummaryButton() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { setSummaryData, setQuizData } = useSummary();

    const handleClick = async () => {
        setIsSubmitting(true);
        setError(null);

        const videoId = 'iNvYsGKelYs';
        try {
            // 첫 번째 요청: 타임스탬프와 디스크립션
            const timestampResponse = await fetch('http://localhost:5050/summarization', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ videoId }),
            });

            if (!timestampResponse.ok) {
                const errorData = await timestampResponse.json();
                throw new Error(errorData.message || '타임스탬프 요청 실패');
            }

            const summaryList = await timestampResponse.json();
            console.log('타임스탬프 응답 데이터:', summaryList);

            // 두 번째 요청: 퀴즈와 퀴즈타임스탬프 및 정답
            const quizResponse = await fetch('http://localhost:5050/quiz', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ videoId }),
            });

            if (!quizResponse.ok) {
                const errorData = await quizResponse.json();
                throw new Error(errorData.message || '퀴즈 요청 실패');
            }

            const rawQuizData = await quizResponse.json();
            console.log('퀴즈 응답 데이터:', rawQuizData);

            // Context에 데이터 저장
            setSummaryData({
                summaryList: summaryList.map((item: any) => ({
                    id: item.id,
                    timestamp: item.timestamp,
                    description: item.summary,
                })),
            });

            // 퀴즈 데이터 매핑 수정
            const mappedQuizData = {
                quizList: rawQuizData.map((quiz: any) => ({
                    timestamp: quiz.timestamp,
                    question: quiz.question,
                    answer: quiz.answer,
                })),
            };
            console.log('매핑된 퀴즈 데이터:', mappedQuizData);
            setQuizData(mappedQuizData);

            alert('요약 및 퀴즈 데이터가 저장되었습니다.');
        } catch (err) {
            console.error('요청 오류:', err);
            setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <button
                onClick={handleClick}
                disabled={isSubmitting}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
            >
                {isSubmitting ? '전송 중...' : '요약하기'}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
}
