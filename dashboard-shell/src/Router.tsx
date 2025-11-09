import { Route, Routes, useParams } from 'react-router-dom';
import MainContainer from './components/MainContainer';
import { Suspense, lazy } from 'react';
import LoadingRemoteApp from './components/LoadingRemoteApp';

const Router = () => {

    //Router config
    const RemoteUserList = lazy(() => import('remoteUserList/UserList'));
    const RemoteUserDetails = lazy(() => import('remoteUserDetails/UserDetails'));

    //extracting the id to load the user details component
    const RemoteUserDetailsWrapper = () => {
        const { id } = useParams<{ id: string }>();
        if (!id) return null;
        return <RemoteUserDetails userId={parseInt(id)} />;
    };

    return (
        <Suspense fallback={<LoadingRemoteApp />} >
            <Routes>
                <Route path="/" element={<MainContainer />} />
                <Route path="/users" element={<RemoteUserList />} />
                <Route path="/users/:id" element={<RemoteUserDetailsWrapper />} />
            </Routes>
        </Suspense>
    )
}
export default Router