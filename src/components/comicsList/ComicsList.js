
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/errorMessage';
import Spinner from '../spinner/Spinner';

import './comicsList.scss';

const ComicsList = (props) => {

    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(250);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();

    useEffect((e) => {
        onRequest(e, offset, true);
    }, [])

    const onRequest = (e, offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(res => onComicsListLoaded(res, e));
    }

    const onComicsListLoaded = (newComicsList, e) => {

        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 8);
        setComicsEnded(ended);
        if (e) {
            window.scrollBy(0, 600)
        }
    }
    
    function renderItems(arr) {
        const items = arr.map((item, i) => {
            return (
                <CSSTransition key={item.id} timeout={300} classNames='comics__item'>
                    <li 
                        className="comics__item"
                        key={i}>
                        <Link to={`/comics/${item.id}`}>
                            <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                            <div className="comics__item-name">{item.title}</div>
                            <div className="comics__item-price">{item.price}</div>
                        </Link>
                    </li>
                </CSSTransition>
            )
        })

        return (
            <ul className="comics__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        );
    }

    const items = renderItems(comicsList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': comicsEnded ? 'none' : 'block'}}
                onClick={(e) => onRequest(e, offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;