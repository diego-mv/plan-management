import { HttpException, HttpStatus } from "@nestjs/common";

export const errorController = (error: Error) => {
    throw new HttpException({ status: HttpStatus.INTERNAL_SERVER_ERROR, message: error.message }, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: error
    });
}