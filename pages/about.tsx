import React, { useState } from 'react';

interface IProps {
    data?: {success: boolean; message: string};
}

const About = (props: IProps) => {
    const [value, setValue] = useState('');
    console.log("About props:", props.data);
    return (
        <>
            <h4>API 연결</h4>
            <p>{props.data.message}</p>
        </>
    );
};

About.getInitialProps = async function ({ req, res }) {
    const isServer = !!req;
    const { abouts } = res.locals;
    console.log("getInitialProps : ", abouts);
    return { data: abouts }
    // if (isServer) {
    //     const { abouts } = res.locals;
    //     console.log('got data in server side:');
    //     return { data: abouts };
    // } else {
    //     const response = await axios.get('/api/getUser');
    //     console.log('got data in client side.');
    //     return { data: response.data };
    // }
};

export default About;