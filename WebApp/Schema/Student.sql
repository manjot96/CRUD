CREATE TABLE [dbo].[Student]
(
	[StudentId]  INT  IDENTITY(1,1) NOT NULL,
	[FirstName]  NVARCHAR (64) NOT NULL,
	[LastName]   NVARCHAR (64) NOT NULL,
	[CreatedAt]  DATETIME CONSTRAINT [DF_Student_CreatedAt] DEFAULT GETDATE() NOT NULL,
	[VersionCol] ROWVERSION   NOT NULL
	CONSTRAINT [PK_Student] PRIMARY KEY CLUSTERED ([StudentId] ASC),
)
