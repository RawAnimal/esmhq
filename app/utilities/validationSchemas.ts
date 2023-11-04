import { string, z } from 'zod';
import { Dayjs } from 'dayjs';
import { error } from 'console';

const postalRegEx = /[A-Za-z]\d[A-Za-z]\s\d[A-Za-z]\d/i;
const phoneRegEx = /\d{3}\s\d{3}[-‑]\d{4}/;
const passwordRegEx =
  /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{5,15}$/;

export const userSchema = z.object({
  firstName: z.string().min(1).max(25, '<= 25 characters'),
  lastName: z.string().min(1).max(25, '<= characters'),
  title: z.string().max(25, '<= characters').optional(),
  email: z.string().email().max(255, '<= 255 characters'),
  phone: z
    .string()
    .regex(phoneRegEx, 'Format: 000 000-0000')
    .min(10, '>= 10 characters')
    .max(12, '<= 12 characters')
    .or(z.literal('', { errorMap: () => ({ message: 'Error prPhone' }) }))
    .optional(),
  role: z.enum(['WEBUSER', 'WEBADMIN', 'ADMIN', 'EXEC']).default('WEBUSER'),
  password: z
    .string()
    .regex(passwordRegEx, 'No spaces. 5-15 of A-a-1-(*/!/#/%)')
    .min(5, '> 5 characters')
    .max(15, '<= 15 characters'),
  //confirmPassword: z.string().min(5, "> 5 characters").optional(),
});
// .refine((data) => data.password === data.confirmPassword, {
//   message: "Passwords must match",
// });

export const siteSchema = z.object({
  //startDate: z.coerce.date(),
  streetNumberName: z
    .string()
    .min(3, '>= 3 characters')
    .max(255, '<= 255 characters'),
  cityTown: z.string().min(3, '>= 3 characters').max(50, '<= 50 characters'),
  province: z
    .enum([
      'AB',
      'BC',
      'MB',
      'NB',
      'NL',
      'NT',
      'NS',
      'NU',
      'ON',
      'PE',
      'QC',
      'SK',
      'YT',
    ])
    .default('ON'),
  postal: z
    .string()
    .regex(postalRegEx, 'Format A1A 1A1')
    .min(6, '>= 6 characters')
    .max(7, '<= 7 characters'),
  assignment: z
    .enum([
      'EMERGENCY',
      'HIGH_RISK',
      'LABOR_DISPUTE',
      'LOSS_PREVENTION',
      'STATIC_SERVICE',
    ])
    .default('EMERGENCY'),
  assignmentType: z
    .enum([
      'ACCESS_CONTROL',
      'ADMIN_CLERKING',
      'FIRE',
      'FLOOD',
      'TERMINATION',
      'THEFT',
      'VANDALISM',
    ])
    .default('FIRE'),
  withVehicle: z.boolean(),
  details: z.string().min(1, 'Site details are required').max(65535),
  estHours: z.coerce.number().gte(4, '>=4 hours'),
  endDate: z.coerce
    .date()
    .or(
      z.literal(undefined, { errorMap: () => ({ message: 'Error endDate' }) })
    )
    .optional(),
  fileNumber: z.string().max(10, '<=10 characters').optional(),
  schedulerURL: z
    .string()
    .url()
    .max(255, '<=255 characters')
    .or(z.literal('', { errorMap: () => ({ message: 'Error schedulerURL' }) }))
    .optional(),
  clName: z.string().min(2, '>=2 characters').max(100, '<=100 characters'),
  clCompany: z.string().min(2, '>=2 characters').max(100, '<=100 characters'),
  clPhone: z
    .string()
    .regex(phoneRegEx, 'Format: 000 000-0000')
    .min(10, '>= 10 characters')
    .max(12, '<= 12 characters'),
  clEmail: z.string().email().max(255, '<= 255 characters'),
  clAddress: z.string().max(255, '<= 255 characters').optional(),
  clSSFNs: z.string().max(100, '<= 100 characters').optional(),
  prName: z.string().max(100, '<= 100 characters').optional(),
  prCompany: z.string().max(100, '<= 100 characters').optional(),
  prPhone: z
    .string()
    .regex(phoneRegEx, 'Format: 000 000-0000')
    .min(10, '>= 10 characters')
    .max(12, '<= 12 characters')
    .or(z.literal('', { errorMap: () => ({ message: 'Error prPhone' }) }))
    .optional(),
  prEmail: z
    .string()
    .email()
    .max(255, '<= 255 characters')
    .or(z.literal('', { errorMap: () => ({ message: 'Error prEmail' }) }))
    .optional(),
  prAddress: z.string().max(255, '<= 255 characters').optional(),
  prSSFNs: z.string().max(100, '<= 100 characters').optional(),
  assignedToUserId: z
    .string()
    .min(1, '> 1 character')
    .max(255, '<= 255 characters')
    .optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE'),
});

export const patchSiteSchema = z.object({
  startDate: z.coerce.date().optional(),
  streetNumberName: z
    .string()
    .min(3, '>= 3 characters')
    .max(255, '<= 255 characters')
    .optional(),
  cityTown: z
    .string()
    .min(1, '>= 2 characters')
    .max(50, '<= 50 characters')
    .optional(),
  province: z
    .enum([
      'AB',
      'BC',
      'MB',
      'NB',
      'NL',
      'NT',
      'NS',
      'NU',
      'ON',
      'PE',
      'QC',
      'SK',
      'YT',
    ])
    .default('ON')
    .optional(),
  postal: z
    .string()
    .regex(postalRegEx, 'Format A1A 1A1')
    .min(6, '>= 6 characters')
    .max(7, '<= 7 characters')
    .optional(),
  assignment: z
    .enum([
      'EMERGENCY',
      'HIGH_RISK',
      'LABOR_DISPUTE',
      'LOSS_PREVENTION',
      'STATIC_SERVICE',
    ])
    .default('EMERGENCY')
    .optional(),
  assignmentType: z
    .enum([
      'ACCESS_CONTROL',
      'ADMIN_CLERKING',
      'FIRE',
      'FLOOD',
      'TERMINATION',
      'THEFT',
      'VANDALISM',
    ])
    .optional()
    .default('FIRE')
    .optional(),
  withVehicle: z.boolean().optional(),
  details: z
    .string()
    .min(1, 'Site details are required')
    .max(65535)
    .optional(),
  estHours: z.coerce.number().gte(4, '>=4 hours').optional(),
  endDate: z.coerce
    .date()
    .or(
      z.literal(undefined, { errorMap: () => ({ message: 'Error endDate' }) })
    )
    .optional(),
  fileNumber: z.string().max(10, '<=10 characters').optional(),
  schedulerURL: z
    .string()
    .url()
    .max(255, '<=255 characters')
    .or(z.literal('', { errorMap: () => ({ message: 'Error schedulerURL' }) }))
    .optional(),
  clName: z
    .string()
    .min(2, '>=2 characters')
    .max(100, '<=100 characters')
    .optional(),
  clCompany: z
    .string()
    .min(2, '>=2 characters')
    .max(100, '<=100 characters')
    .optional(),
  clPhone: z
    .string()
    .regex(phoneRegEx, 'Format: 000 000-0000')
    .min(10, '>= 10 characters')
    .max(12, '<= 12 characters')
    .optional(),
  clEmail: z.string().email().max(255, '<= 255 characters').optional(),
  clAddress: z.string().max(255, '<= 255 characters').optional(),
  clSSFNs: z.string().max(100, '<= 100 characters').optional(),
  prName: z.string().max(100, '<= 100 characters').optional(),
  prCompany: z.string().max(100, '<= 100 characters').optional(),
  prPhone: z
    .string()
    .regex(phoneRegEx, 'Format: 000 000-0000')
    .min(10, '>= 10 characters')
    .max(12, '<= 12 characters')
    .or(z.literal('', { errorMap: () => ({ message: 'Error prPhone' }) }))
    .optional(),
  prEmail: z
    .string()
    .email()
    .max(255, '<= 255 characters')
    .or(z.literal('', { errorMap: () => ({ message: 'Error prEmail' }) }))
    .optional(),
  prAddress: z.string().max(255, '<= 255 characters').optional(),
  prSSFNs: z.string().max(100, '<= 100 characters').optional(),
  assignedToUserId: z
    .string()
    .min(1, '> 1 character')
    .max(255, '<= 255 characters')
    .nullable()
    .optional(),
  status: z.enum(['ACTIVE', 'INACTIVE']).default('ACTIVE').optional(),
});
