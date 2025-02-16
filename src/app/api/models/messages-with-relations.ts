/* tslint:disable */
/* eslint-disable */
import { CaseWithRelations } from '../models/case-with-relations';
import { UserWithRelations } from '../models/user-with-relations';

/**
 * (tsType: MessagesWithRelations, schemaOptions: { includeRelations: true })
 */
export interface MessagesWithRelations {
  case?: CaseWithRelations;
  caseId?: number;
  created_at?: string;
  foreignKey?: any;
  id?: number;
  isReadByAdmin?: boolean;
  isReadByDoctor?: boolean;
  message?: string;
  stage?: string;
  user?: UserWithRelations;
  userId?: string;
}
