import React from 'react';
import {Route, Routes} from 'react-router-dom';
import {routes} from '../routes/index'

const AppRouter = () => {
    return (
        <Routes>
            {routes.map(({exact, path, element}) =>
                <Route key={path} element={element} exact={exact} path={path}/>
            )}
        </Routes>
    );
};

export default AppRouter;