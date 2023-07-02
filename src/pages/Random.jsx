import './Random.css';
function Random({ card, handleClickBtn }) {
    return (
        <div className='random'>
            <div>
                <div className='random__slide'>
                    <img
                        src={card.images && card.images.downsized.url}
                        alt='Изображение'
                        className='random__image'
                    />
                    <button
                        onClick={handleClickBtn}
                        className='random__btn'
                    ></button>
                </div>
                {card.user && (
                    <div className='random__user-info'>
                        <img
                            src={card.user.avatar_url}
                            alt='Аватар'
                            className='random__avatar'
                        />
                        <h3 className='random__username'>{card.username}</h3>
                    </div>
                )}
            </div>
        </div>
    );
}
export default Random;
