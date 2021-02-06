const { response } = require('express');
const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
// const { isLoggedIn, isNotLoggedIn } = require('./middlewares.js');
const { USERS } = require('../models');

const router = express.Router();

/* 회원가입 API */

router.post('/api/register', async (req, res, next) => {
  
    const { userId, password, name } = req.body;

    try {
      const userCheck = await USERS.findOne({ where: { userId } });
      if(userCheck){
        req.flash('registerError', '이미 존재하는 아이디입니다.');
        return  res.json({
          result: 'FAILURE',
          message: '이미존재하는 회원입니다.'
        });
      }
      const hash = await bcrypt.hash(password, 12);
      await USERS.create({
        userId,
        name,
        password: hash,
      });
      return  res.json({
        result: 'SUCCESS',
        message: '회원가입에 성공하였습니다.'
      });
    } catch (error) {
      return next(error);
    }
}) // 회원가입

/* 로그인, 로그아웃 API */

router.post('/api/login', (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      req.flash('loginError', info.message);
      return  res.json({
        result: 'FAILURE',
        message: '회원정보가 없습니다.'
      });
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return  res.json({
        result: 'SUCCESS',
        message: '로그인에 성공하였습니다.',
        data: { userId: user.userId}
      });
    });
  })(req, res, next);
});

router.post('/api/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  return  res.json({
    result: 'SUCCESS',
    message: '로그아웃에 성공하였습니다.'
  });
});

module.exports = router;