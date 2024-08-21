import express from "express";
const router = express.Router();
import {
  registrationUsers,
  loginUsers,
  getProfile,
  profileUpdate,
  updateProfileImage,
} from "./controller/membership";
import {
  regisValidation,
  loginValidation,
} from "./validator/membership.validator";
import {
  topUpValidation,
  transactionValidation,
} from "./validator/transaction.validator";
import { getBalance, topup, transaction } from "./controller/transaction";
import { getBanner, getService } from "./controller/information";
import { verifyToken } from "./middleware/verifyToken";
import { uploader } from "./middleware/uploader";
import { validationImg } from "./validator/uploadImg.validator";

// membership
router.post("/registration", regisValidation, registrationUsers);
router.post("/login", loginValidation, loginUsers);
router.get("/profile", verifyToken, getProfile);
router.put("/profile/update", verifyToken, profileUpdate);
router.put(
  "/profile/image",
  verifyToken,
  uploader("/profileImage", "profile").array("picture"),
  validationImg,
  updateProfileImage
);

//information
router.get("/banner", verifyToken, getBanner);
router.get("/services", verifyToken, getService);

//transaction
router.get("/balance", verifyToken, getBalance);
router.post("/topup", verifyToken, topUpValidation, topup);
router.post("/transaction", verifyToken, transactionValidation, transaction);

export default router;
