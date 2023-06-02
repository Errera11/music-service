import React from 'react';
import {useRouter} from "next/router";
import Link from "next/link";

const Navbar = () => {
    const router = useRouter()
    return (
        <div className={'container'}>
            <div className={'links'}>
                <div onClick={() => router.push('/')}>
                    Main
                </div>
                <div className={'my'}>
                    <div onClick={() => router.push('/track/tracks')}>My tracks</div>
                    <Link style={{textDecoration: 'none', color: 'black'}}
                        href="/album/albums">My Albums</Link>
                </div>
            </div>
            <style jsx>
                {
                    `
                      .container {
                        background: honeydew;
                        height: 80px;
                        width: 100%;
                        padding: 13px;
                        align-items: center;
                        box-sizing: border-box;
                      }

                      .links {
                        display: flex;
                        justify-content: space-between;
                        cursor: pointer;
                        margin-top: 18px;
                      }

                      .my {
                        display: flex;
                      }

                      .my div {
                        margin: 0px 30px;
                      }
                    `
                }
            </style>
        </div>
    );
};

export default Navbar;