import { NextPage } from "next";
import React, { useEffect } from 'react';
import Router from 'next/router';

const RootStep: NextPage = () => {
    useEffect(() => {
        Router.push("/step/1");
    }, []);

    return <button onClick={() => Router.push("/step/1")}> Go To Main Step </button>
}

export default RootStep;

