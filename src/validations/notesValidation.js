import { Joi, Segments } from "celebrate";
import { isValidObjectId } from 'mongoose';
import { TAGS } from "../constants/tags.js";

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format') : value;
};


export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object(
    {
      page: Joi.number().min(1).default(1),
      perPage: Joi.number().min(5).max(20).default(10),
      tag: Joi.string().valid(...TAGS),
      search: Joi.string().trim().allow('')
    })
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object(
    {
      noteId: Joi.string().custom(objectIdValidator).required(),
    })
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object(
    {
      title: Joi.string().max(100).required(),
      content: Joi.string().required(),
      tag: Joi.string().max(30).required(),
    })
};

export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object(
    {
      id: Joi.string().custom(objectIdValidator).required(),
    }),
  [Segments.BODY]: Joi.object(
    {
      title: Joi.string().max(100),
      content: Joi.string(),
      tag: Joi.string().valid(...TAGS),
    }).min(1)
};

