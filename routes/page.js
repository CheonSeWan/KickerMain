const express = require('express');
// const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { renderProfile, renderJoin, renderMain, renderHashtag, renderLogin } = require('../controllers/page');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.followerCount = req.user?.Followers?.length || 0;
    res.locals.followingCount = req.user?.Followings?.length || 0;
    res.locals.followingIdList = req.user?.Followings?.map(f => f.id) || [];
    next();
});

router.get('/profile',  renderProfile);
router.get('/join',  renderJoin);
router.get('/login',  renderLogin); // 로그인 페이지 추가
router.get('/', renderMain);
router.get('/hashtag', renderHashtag);

module.exports = router;
