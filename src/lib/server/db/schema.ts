import { relations } from 'drizzle-orm';
import { boolean, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const post = pgTable('post', {
	id: serial('id').primaryKey(),
	title: text('title'),
	imageUrl: text('imageUrl').notNull(),
	createdAt: timestamp('createdAt').defaultNow(),
	userId: text('user_id')
		.notNull()
		.default('OfASf10VoDmLBhpSajsHJgaIHDIj3zXd')
		.references(() => user.id)
});

// better-auth stuff
export const user = pgTable('user', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	bio: text('bio').notNull().default('a very cool bio'),
	email: text('email').notNull().unique(),
	emailVerified: boolean('email_verified').notNull(),
	image: text('image'),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull()
});

export const postRelations = relations(post, ({ one }) => ({
	user: one(user, {
		fields: [post.userId],
		references: [user.id]
	})
}));

export const userRelations = relations(user, ({ many }) => ({
	posts: many(post)
}));

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	expiresAt: timestamp('expires_at').notNull(),
	token: text('token').notNull().unique(),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull(),
	ipAddress: text('ip_address'),
	userAgent: text('user_agent'),
	userId: text('user_id')
		.notNull()
		.references(() => user.id)
});

export const account = pgTable('account', {
	id: text('id').primaryKey(),
	accountId: text('account_id').notNull(),
	providerId: text('provider_id').notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	accessToken: text('access_token'),
	refreshToken: text('refresh_token'),
	idToken: text('id_token'),
	accessTokenExpiresAt: timestamp('access_token_expires_at'),
	refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
	scope: text('scope'),
	password: text('password'),
	createdAt: timestamp('created_at').notNull(),
	updatedAt: timestamp('updated_at').notNull()
});

export const verification = pgTable('verification', {
	id: text('id').primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: timestamp('expires_at').notNull(),
	createdAt: timestamp('created_at'),
	updatedAt: timestamp('updated_at')
});
