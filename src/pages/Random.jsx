import './Random.css';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { useState, useRef, useEffect } from 'react';
import Slide from '../components/Slide/Slide';
function Random({ current, next, onSwipe, loadedRandomGif }) {
    const [isDisabled, setIsDisabled] = useState(true);

    function handleSwipe() {
        onSwipe((prev) => (prev === 'current' ? 'next' : 'current'));
        setIsDisabled(!isDisabled);
    }

    return (
        <section className='random'>
            <SwitchTransition mode={'out-in'}>
                <CSSTransition
                    timeout={1000}
                    key={loadedRandomGif === 'current' ? current.id : next.id}
                    classNames='fade'
                >
                    {loadedRandomGif === 'current' ? <Slide card={next} /> : <Slide card={current} />}
                </CSSTransition>
            </SwitchTransition>
            <SwitchTransition mode={'out-in'}>
                <CSSTransition
                    timeout={1100}
                    key={isDisabled}
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
        </section>
    );
}
export default Random;
