import './randomChar.scss';

import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';

import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = (props) => {

    const [char, setChar] = useState({});
    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {
        updateChar();
        // const timerId = setInterval(updateChar, 10000);

        // return () => {
        //     clearInterval(timerId)
        // }
    }, [])

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then(onCharLoaded)
    }

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || error) ? <View char={char} OnCharSelected={props.OnCharSelected}/> : null

    return (
        <div className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = (props) => {

    const {name, description, thumbnail, homepage, wiki, id} = props.char;

    let imageClassName = 'randomchar__img randomchar__img_';
    const imageNotFound = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'

    if (thumbnail === imageNotFound) {
        imageClassName += 'imageNotFound';
    }

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className={imageClassName}/>
            <div className="randomchar__info">
                <p className="randomchar__name"
                   onClick={() => props.OnCharSelected(id)}>{name}</p>
                <p className="randomchar__descr">
                    {description && description.length > 200 ? `${props.char.description.slice(0, 200) + '...'}` : props.char.description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;