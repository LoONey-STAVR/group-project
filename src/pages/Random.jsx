import './Random.css';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { useState } from 'react';
import Loader from '../components/Loader/Loader';

import Slide from '../components/Slide/Slide';
function Random({ current, next, onSwipe, loadedRandomGif }) {
    const [isloaded, setIsLoaded] = useState(true);
    function handleSwipe() {
        onSwipe((prev) => (prev === 'current' ? 'next' : 'current'));
        setIsLoaded(false);
    }

    function handleLoad() {
        setIsLoaded(true);
    }

    return (
        <section className='random'>
            <SwitchTransition mode={'out-in'}>
                <CSSTransition
                    timeout={1100}
                    key={loadedRandomGif}
                    classNames='fade'
                >
                    {loadedRandomGif === 'current' ? (
                        <Slide
                            onLoad={handleLoad}
                            card={next}
                        />
                    ) : (
                        <Slide
                            onLoad={handleLoad}
                            card={current}
                        />
                    )}
                </CSSTransition>
            </SwitchTransition>

            <SwitchTransition mode={'out-in'}>
                <CSSTransition
                    timeout={1500}
                    key={loadedRandomGif}
                    classNames='opacity'
                >
                    <button
                        onClick={handleSwipe}
                        className={`random__btn fade}`}
                    >
                        Следующая
                    </button>
                </CSSTransition>
            </SwitchTransition>
            {!isloaded && <Loader />}
        </section>
    );
}
export default Random;
