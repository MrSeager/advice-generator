import React, { FC, useState, useEffect } from 'react';
//Components
import './AdviceGenStyle.css';
import axios from 'axios';
//Bootstrap
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Button, Image } from 'react-bootstrap';
//Spring
import { useSpring, animated, useTransition } from '@react-spring/web';
//Images
import BtnImg from '../images/icon-dice.svg';
import DivImg from '../images/pattern-divider-desktop.svg';

const AdviceGenPage: FC = () => {
    const [adv, setAdv] = useState([{ key: 0, id: null, text: '' }]);

    const fetchAdvice = async () => { 
        try { 
            const response = await axios.get('https://api.adviceslip.com/advice'); 
            const advice = response.data.slip;
            setAdv([{ key: Date.now(), id: advice.id, text: advice.advice }]);
        } catch (error) { 
            console.error('Error fetching advice:', error); 
        }
    };

    const transitions = useTransition(adv, { 
        from: { opacity: 0, transform: 'translateY(-220px)' }, 
        enter: { opacity: 1, transform: 'translateY(0)' }, 
        leave: { opacity: 0, transform: 'translateY(220px)' }, 
        config: { tension: 220, friction: 24 }, 
        exitBeforeEnter: true, 
    });

    const animBtn = useSpring({
        from: { transform: 'rotate(0deg)' }, 
        to: { transform: 'rotate(360deg)' }, 
        config: { duration: 2000 }, 
        loop: true,
    });

    useEffect(() => { 
        fetchAdvice(); 
    }, []);

    return (
        <Container fluid className='overflow-hidden cs-bg-dark-blue min-vh-100 d-flex flex-column align-items-center justify-content-center'>
            {transitions((style, item) => (
                item.id !== null && (
                    <animated.div style={style} key={item.key} className='cs-w'>
                        <Container fluid className='cs-position text-white cs-bg-dark-grayish-blue d-flex flex-column align-items-center justify-content-between text-center py-5 px-4 rounded rounded-4 gap-3'>
                            <h1 className='cs-ls cs-tc-green h6 mb-4 text-uppercase'>Advice #{item.id}</h1>
                            <p className='cs-tc-cyan fs-3'>“{item.text}”</p>
                            <Image fluid src={DivImg} alt='divider' className='w-100 mb-3 cs-img' />
                            <Button type='button' onClick={fetchAdvice} className='cs-btn border-0 rounded-circle p-3'>
                                <animated.img style={animBtn} src={BtnImg} alt='btn logo' />
                            </Button>
                        </Container>
                    </animated.div>
                )
            ))}
        </Container>
    );
}

export default AdviceGenPage;