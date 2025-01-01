import type { Metadata } from 'next';
import Header from './components/Layout/Header';
import './globals.css'; // 글로벌 CSS 가져오기

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                {/* 베모페이지에서는 안나오게 해야함 -> 우선 주석 처리*/}
                {/* <Header /> */}
                {children}
            </body>
        </html>
    );
}
