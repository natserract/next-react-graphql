import React from 'react';
import { NavigationProps } from './navigation.model';
import Link from 'next/link';
import  './navigation.scss';

export default function Navigation(props: NavigationProps) {
    return (
        <div className={props.class}>
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
    );
};