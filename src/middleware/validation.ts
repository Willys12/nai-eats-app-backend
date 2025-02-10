import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors = (
    req: Request, 
    res: Response, 
    next: NextFunction) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }

export const validateMyUserRequest = [
    body("name").isString().notEmpty().withMessage("Name must be a string"),
    body("addressLine1").isString().notEmpty().withMessage("AddressLine1 must be a string"),
    body("city").isString().notEmpty().withMessage("City must be a string"),
    body("country").isString().notEmpty().withMessage("Country must be a string"),
    handleValidationErrors
]

export const validateMyRestaurantRequest = [
// add restaurantName, city, country, deliveryPrice, estimatedDeliveryTime, cuisines
    body("restaurantName").notEmpty().withMessage("Restaurant Name must be a string"),
    body("city").notEmpty().withMessage("City must be a string"),
    body("country").notEmpty().withMessage("Country must be a string"),
    body("deliveryPrice").isFloat({ min: 0}).withMessage("Delivery Price must be a positive number"),
    body("estimatedDeliveryTime").isInt({ min: 0}).withMessage("Estimated Delivery Time must be a positive integer"),
    body("cuisines")
        .isArray()
        .withMessage("Cuisines must be an array")
        .not()
        .isEmpty()
        .withMessage("Cuisines array cannot be empty"),
    body("menuItems").isArray().withMessage("Menu Items must be an array"),
    body("menuItems.*.name")
        .notEmpty()
        .withMessage("Menu items name is required"),
    body("menuItems.*.price")
        .isFloat({ min: 0})
        .withMessage("Menu Items must be a positive integer"),
        handleValidationErrors,
];