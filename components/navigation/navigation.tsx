import React from 'react';
import style from './navigation.module.scss';
import { NavigationProps } from './navigation.model';
import Link from 'next/link';

export default function Navigation(props: NavigationProps) {
    return (
        <header className={style.HeadNavWrapper}>
            <div className={style.HeadNavWrapper__Navigation}>
                <Link href="/">
                    <a>Home</a>
                </Link>
                <Link href="/about">
                    <a>About</a>
                </Link>
                <Link href="/user">
                    <a>All Users</a>
                </Link>
                <Link href="/user/create-user">
                    <a>Create User</a>
                </Link>
            </div>
        </header>
    );
};