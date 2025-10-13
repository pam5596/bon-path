import { GetLoginSessionRoute } from "./session/getLoginSession";
export const getLoginSession = new GetLoginSessionRoute()

import { CreateLoginSessionRoute } from "./session/createLoginSession";
export const createLoginSession = new CreateLoginSessionRoute()

import { DeleteLoginSessionRoute } from "./session/deleteLoginSession";
export const deleteLoginSession = new DeleteLoginSessionRoute()

import { GetVerifySessionRoute } from "./session/getVerifySession";
export const getVerifySession = new GetVerifySessionRoute()

import { CreateVerifySessionRoute } from "./session/createVerifySession";
export const createVerifySession = new CreateVerifySessionRoute()

import { CreateUserRoute } from "./users/createUser";
export const createUser = new CreateUserRoute()

import { GetUserRoute } from "./users/getUser";
export const getUser = new GetUserRoute()

import { UpdateUserRoute } from "./users/updateUser";
export const updateUser = new UpdateUserRoute()

import { DeleteUserRoute } from "./users/deleteUser";
export const deleteUser = new DeleteUserRoute()