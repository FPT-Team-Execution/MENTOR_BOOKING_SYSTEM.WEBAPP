// public string Id { get; set; }
// public string? Industry { get; set; } = default;
// public int ConsumePoint { get; set; } = default;
// public IEnumerable<Major> Major { get; set; }

// //inheritant
// public string FullName { get; set; }
// public string? AvatarUrl { get; set; }
// public string Gender { get; set; }
// public DateTime? Birthday { get; set; }

// // IdentityUser Properties
// public string? UserName { get; set; }
// public string? Email { get; set; }
// public string? PhoneNumber { get; set; }
// public bool EmailConfirmed { get; set; }
// public DateTime? LockoutEnd { get; set; }
// public bool LockoutEnabled { get; set; }
// public string? CreatedBy { get; set; }
// public DateTime? CreatedOn { get; set; }
// public string? UpdatedBy { get; set; }
// public DateTime? UpdatedOn { get; set; }


export type GetMentorResModel = {
    id: string,
    industry: string,
    consumePoint: number
    major: Major[],
    fullName: string,
    avatarUrl: string,
    birthday: Date | null,
    userName: string
    email: string,
    phoneNumber: string,
    emailConfirmed: boolean,
    lockoutEnd: Date
    lockoutEnabled: boolean,
    createdBy: string,
    createdOn: Date,
    updatedBy: string,
    updatedOn: Date,
    gender: string
}

export type Major = {
    id: string,
    name: string
}