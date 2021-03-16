import ArtistRequests from "./components/ArtistRequests/ArtistRequests"
import ArtistProfile from "./components/ArtistRequests/ArtistProfile/ArtistProfile"


export default [
    {
        path: '/artist-requests',
        component : ArtistRequests
    }, {
        path: '/requests/profile/:id',
        component : ArtistProfile
    }
]