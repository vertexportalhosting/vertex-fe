/* tslint:disable */
/* eslint-disable */

/**
 * (tsType: Omit<Messages, 'id'>, schemaOptions: { title: 'NewMessages', exclude: [ 'id' ] })
 */
export interface NewMessages {
  caseId?: number;
  created_at?: string;
  isReadByAdmin?: boolean;
  isReadByDoctor?: boolean;
  message?: string;
  stage?: string;
  userId?: string;
}
