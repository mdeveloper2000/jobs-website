const { Router } = require("express")

const jobController = require("../controllers/jobController")
const userController = require("../controllers/userController")
const profileController = require("../controllers/profileController")
const authMiddleware = require("../middleware/authMiddleware")

const router = Router()

router.get("/login", userController.login_get)
router.post("/login", userController.login_post)
router.get("/register", userController.register_get)
router.post("/register/create", userController.register_post)
router.get("/logout", authMiddleware.checkUser, userController.logout_get)

router.get("/", jobController.index_get)
router.get("/jobs", authMiddleware.checkUser, jobController.jobs_list)
router.get("/job/:id", authMiddleware.checkUser, jobController.job_show)
router.get("/jobs/search/:search", jobController.job_search)
router.post("/job/subscribe", jobController.subscribe_job)
router.get("/subscriptions", authMiddleware.checkUser, jobController.subscriptions_list)

router.get("/profile", authMiddleware.checkUser, profileController.profile_get)
router.post("/profile/update", authMiddleware.checkUser, profileController.profile_post)

router.all("*", authMiddleware.checkUser, userController.not_found)

module.exports = router