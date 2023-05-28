import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

import { lazy, Suspense, createRef } from "react";
import { useLocation, useOutlet} from "react-router-dom";

import { CSSTransition, SwitchTransition } from "react-transition-group"; 

const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));
const SingleComicPage = lazy(() => import('../pages/SingleComicPage/SingleComicPage'));

const allRoutes = [
        
        { path: '/', Component: <MainPage/>, nodeRef: createRef() },
        { path: '/comics', Component: <ComicsPage/>, nodeRef: createRef() },
        { path: '/comics/:comicId', Component: <SingleComicPage/>, nodeRef: createRef()}
    ]

const App = () => {

    const location = useLocation();
    const currentOutlet = useOutlet();
    const { nodeRef } = allRoutes.find((route) => route.path === location.pathname) ?? {}

    return (
        <div className="app">
            <AppHeader/>  
            <main>
                <Suspense fallback={<Spinner/>}>
                    <SwitchTransition>
                        <CSSTransition
                            key={location.pathname}
                            nodeRef={nodeRef}
                            timeout={300}
                            classNames='page'
                            unmountOnExit>
                                {(state) => (
                                    <div ref={nodeRef} className="page">
                                        {currentOutlet}
                                    </div>
                                )}
                        </CSSTransition>
                    </SwitchTransition>
                        
                </Suspense>
            </main>
        </div>
    )
}

export default App;
