"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
function IsCo(property, validationOptions) {
    return function (object, propertyName) {
        class_validator_1.registerDecorator({
            name: "IsColor",
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value, args) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = args.object[relatedPropertyName];
                    return typeof value === "string" &&
                        typeof relatedValue === "string" &&
                        value.length > relatedValue.length;
                }
            }
        });
    };
}
exports.IsCo = IsCo;
//# sourceMappingURL=customvalidator.js.map