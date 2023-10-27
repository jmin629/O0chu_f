import { BrowserRouter, Route, Routes } from "react-router-dom";
import List from "./page/list";

import Header from "./nav/Header";
import NewMovie from "./new/NewMovie 2";
import Search from "./nav/Search";
import Footer from "./footer/Footer";
import Searchlist from "./search/Searchlist";

import Sign from "./view/Authentication/SignIn";
import SignUp from "./view/Authentication/SignUp";
import Genreslist from "./genres/Genreslist";
import Getdetail from "./detail/Getdetail";
import NicknameChange from "./view/Authentication/MyPage/NicknameChange";
import PasswordChange from "./view/Authentication/MyPage/PasswordChange";
import PreferenceChange from "./view/Authentication/MyPage/PreferenceChange";
import MyPage from "./view/Authentication/MyPage";
import Newlist from "./new/Newlist";
import Moviedetailinfo from "./detail/Moviedetailinfo";
import DeleteUser from "./view/Authentication/MyPage/DeleteUser";
import Wishlist from "./wishlist/Wishlist";
import Trash from "./page/Trash";

function App() {
  return (
    <BrowserRouter>
      {/* <Roadscroll /> */}
      <Routes>
        <Route path="/" element={<List />}></Route>
        {/* <Route path="/list/detail/:movie_id" element={<Moviedetail />}></Route> */}
        {/* <Route path="/list2" element={<MovieList />}></Route> */}
        {/* <Route path="/title" element={<Title />}></Route> */}
        {/* <Route path="/fl" element={<Fltest />}></Route> */}
        <Route path="/movies/list/:genres" element={<Genreslist />}></Route>
        <Route path="/movies/list/genres/list" element={<Genreslist />}></Route>
        <Route path="/movies/list/newlsit" element={<NewMovie />}></Route>
        <Route path="/movies/list/serach" element={<Search />}></Route>
        <Route path="/movies/detail" element={<Moviedetailinfo />}></Route>
        <Route path="/movies/wishlist" element={<Wishlist />}></Route>
        <Route path="/search/research/:search" element={<Searchlist />}></Route>
        <Route path="/login" element={<Sign />}></Route>
        <Route path="/register" element={<SignUp />}></Route>
        <Route path="/nicknamechange" element={<NicknameChange />}></Route>
        <Route path="/passwordchange" element={<PasswordChange />}></Route>
        <Route path="/preferencechagne" element={<PreferenceChange />}></Route>
        <Route path="/mypage" element={<MyPage />}></Route>
        <Route path="/withmovie" element={<Newlist />}></Route>
        <Route path="/deleteuser" element={<DeleteUser />}></Route>

        <Route path="/trash" element={<Trash />}></Route>
        <Route path="/detail/:movie_id" element={<Getdetail />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
