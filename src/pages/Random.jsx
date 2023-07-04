import './Random.css';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
function Random({ current, next, handleClickBtn, loadingGifState }) {
    return (
        <section className='random'>
            <SwitchTransition mode={"out-in"}>
                <CSSTransition timeout={1000} key={loadingGifState ? current.id : next.id} classNames="fade">
                    {loadingGifState ?
                        <div className="random__slide">
                            <img
                                src={current.images && current.images.downsized.url}
                                alt='Изображение'
                                className='random__image'
                            />
                            {
                                current.user && (
                                    <div className='random__user-info'>
                                        <img
                                            src={current.user.avatar_url}
                                            alt='Аватар'
                                            className='random__avatar'
                                        />
                                        <h3 className='random__username'>{current.username}</h3>
                                    </div>
                                )
                            }
                        </div> :
                        <div className="random__slide">
                            <img
                                src={next.images && next.images.downsized.url}
                                alt='Изображение'
                                className='random__image'
                            />
                            {
                                next.user && (
                                    <div className='random__user-info'>
                                        <img
                                            src={next.user.avatar_url}
                                            alt='Аватар'
                                            className='random__avatar'
                                        />
                                        <h3 className='random__username'>{next.username}</h3>
                                    </div>
                                )
                            }
                        </div>
                    }
                </CSSTransition>
            </SwitchTransition>
            <button
                onClick={handleClickBtn}
                className='random__btn'
            ></button>
        </section >
    );
}
export default Random;

