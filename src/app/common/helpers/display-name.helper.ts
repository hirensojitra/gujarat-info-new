import { UserPublicInfo } from 'src/app/graphql/types/login.types';

export function getDisplayName(user: UserPublicInfo | null): string {
  if (!user) {
    return 'User';
  }

  // Priority 1: Full Name
  if (user.firstname && user.lastname) {
    return `${user.firstname} ${user.lastname}`;
  }

  // Priority 2: Username
  if (user.username) {
    return user.username;
  }

  // Priority 3: Email
  if (user.email) {
    const emailPrefix = user.email.split('@')[0];
    return emailPrefix;
  }

  // Default fallback
  return 'User';
}
