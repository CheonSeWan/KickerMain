const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/user');

exports.join = async (req, res, next) => {
    const { email, nick, password } = req.body;
    try {
        // 이메일 중복 확인
        const exUserByEmail = await User.findOne({ where: { email } });
        if (exUserByEmail) {
            return res.redirect('/join?error=emailExist');
        }

        // 닉네임 중복 확인
        const exUserByNick = await User.findOne({ where: { nick } });
        if (exUserByNick) {
            return res.redirect('/join?error=nickExist');
        }

        // 중복이 없는 경우에만 사용자 등록
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            nick,
            password: hash,
        });

        const data = true;
        return res.send(data);
    } catch (err) {
        console.error(err);
        return next(err);
    }
};


exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });

        // 사용자가 없거나 비밀번호가 일치하지 않으면 로그인 실패
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.redirect('/?loginError=Invalid credentials');
        }

        // 로그인이 성공하면 세션에 사용자 정보 저장
        req.session.user = {
            id: user.id,
            email: user.email,
            nick: user.nick,
        };
        const data = true;
        return res.send(data);
    } catch (error) {
        console.error(error);
        return next(error);
    }
};


exports.logout = (req, res)=>{
    req.logout(()=>{
        res.redirect('/');
    });
}