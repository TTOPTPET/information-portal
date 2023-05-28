import { useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import SearchPanel from "../SearchPanel/SearchPanel";

import decoration from '../../resources/img/vision.png';

const MainPage = () => {

    const [selectedChar, setChar] = useState(null)

    const onCharSelected = (id) => {
        setChar(id);
    }

    return (
        <>
            <ErrorBoundary>
                <RandomChar
                    OnCharSelected = {onCharSelected}/>
            </ErrorBoundary>
            {/* <ErrorBoundary>
                <SearchPanel/>
            </ErrorBoundary> */}
            <div className="char__content">
                <ErrorBoundary>
                    <CharList
                        OnCharSelected = {onCharSelected}/>
                </ErrorBoundary>
                <ErrorBoundary>
                    <CharInfo
                        charId={selectedChar}/>
                </ErrorBoundary>
                
            </div>
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;