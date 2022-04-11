const express = require('express');
const router = express.Router();
const boardController = require('../controllers/board');
const isAuth = require('../middlewares/auth');

// 게시물 작성
router.post('/',isAuth, boardController.post);

// 게시물 상세 가져오기
router.get('/:id', boardController.get);

// 게시물 수정
router.put('/:id', isAuth, boardController.put);

// 게시물 삭제
router.delete('/:id', isAuth, boardController.remove);

module.exports = router;



// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// try {
//     fs.readdirSync('uploads');
//   } catch (error) {
//     console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
//     fs.mkdirSync('uploads');
//   }
  
//   const upload = multer({
//     // 저장할 위치: uploads
//     storage: multer.diskStorage({
//       destination(req, file, cb) {
//         cb(null, 'uploads/');
//       },
//       filename(req, file, cb) {
//     // 확장자 추출
//         const ext = path.extname(file.originalname);
//     // 파일 이름 중복 방지하기 위해 Date.now() 추가하여 이름 저장
//         cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
//       },
//     }),
//     // 파일용량: 5MB, 1024x1024사이즈
//     limits: { fileSize: 5 * 1024 * 1024 },
//   });
     
//   // 웹: <input id="img" type="file" accept="image/*"
//   // 서버: upload.single('img')
//   // 웹 id="img" 와 upload.single('img')에서 'img 값이 같아야함
//   router.post('/img', upload.single('img'), (req, res) => {
//     // 업로드한 결과물: req.file
//     console.log(req.file);
//     // 미리보기 및 게시글 등록시 한번에 업로드하기 위해 파일 경로 url 보내줌
//     res.json({ url: `/img/${req.file.filename}` });
//   });