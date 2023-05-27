import React from 'react';
import Layout from "@/components/Layout";
import {GetServerSideProps} from "next";
import {NextDispatch, wrapper} from "@/store";
import {fetchTracks} from "@/store/action/tracksAC";
const Index = () => {

    return (
        <>
            <Layout >
                <div>Hello</div>
            </Layout>
        </>
    );
};



export default Index;

