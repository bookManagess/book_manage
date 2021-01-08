const express = require("express");
const resourceController = require('../controller/resourceController')
const resourceTypeController = require('../controller/resourceTypeController')

const courseController = require('../controller/coursecontroller')

const router = express.Router();

router
  .route("/type")
  .post(resourceTypeController.create_resourceType)
  .get(resourceController.getAll_resource)
  
router
  .route("/file")
  .post(resourceController.delete_resource)
  .get(resourceController.getAll_resource)

// 测试
router
  .route("/del")
  .post(courseController.del_course)

router
  .route('/test1')
  .get(courseController.getcourse)
  .post(courseController.update_course)

router
  .route("/test2")
  .get(courseController.get_all)
  .post(courseController.create_course)

  module.exports = router;
