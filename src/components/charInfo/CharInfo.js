
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    const [charInfoClassName, setCharInfoClassName] = useState('char__info')

    const {loading, error, getCharacter, clearError}= useMarvelService();

    useEffect(() => {
        updateChar();
        window.addEventListener("scroll", onScroll);
    }, [props.charId])

    const onScroll = () => {
        if (window.scrollY >= 440) {
            setCharInfoClassName('char__info char__info_sticky')
        } else {
            setCharInfoClassName('char__info')
        }
    }

    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return;
        }

        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const skeleton = char || loading || error ? null : <Skeleton/>

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null

    return (
        <div className={charInfoClassName}>
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) => {

    const {name, description, thumbnail, homepage, wiki, comics} = char

    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'unset'};
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'No comics with this character'}
                {
                    comics.map((item, i) => {
                        if (i < 15) {
                            return (
                                <Link to={`/comics/${item.resourceURI.substring(43)}`} className="char__comics-item"
                                    key={i}>
                                    {item.name}
                                </Link>
                            )
                        }
                    })
                }
            </ul>
        </>
    )
}

export default CharInfo;