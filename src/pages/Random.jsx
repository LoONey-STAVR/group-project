import './Random.css';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
function Random({ current, next, onSwipe, loadingGifState }) {
    function handleSwipe() {
        onSwipe((prev) => !prev);
    }

    return (
        <section className='random'>
            <SwitchTransition mode={'out-in'}>
                <CSSTransition
                    timeout={1000}
                    key={loadingGifState ? current.id : next.id}
                    classNames='fade'
                >
                    {loadingGifState ? (
                        <div className='random__slide'>
                            {current.user && (
                                <div className='random__user-info'>
                                    <img
                                        src={current.user.avatar_url}
                                        alt='Аватар'
                                        className='random__avatar'
                                    />
                                    <h3 className='random__username'>{current.username}</h3>
                                    <img
                                        src={current.images.original.url}
                                        alt='Изображение'
                                        className='random__image'
                                    />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className='random__slide'>
                            {next.user && (
                                <div className='random__user-info'>
                                    <img
                                        src={next.user.avatar_url}
                                        alt='Аватар'
                                        className='random__avatar'
                                    />
                                    <h3 className='random__username'>{next.username}</h3>
                                    <img
                                        src={
                                            next.images.original
                                                ? next.images.original.url
                                                : next.images.downsized.url
                                        }
                                        alt='Изображение'
                                        className='random__image'
                                    />
                                </div>
                            )}
                        </div>
                    )}
                </CSSTransition>
            </SwitchTransition>

            <button
                onClick={handleSwipe}
                className='random__btn'
            >
                Следующая
            </button>
        </section>
    );
}
export default Random;
