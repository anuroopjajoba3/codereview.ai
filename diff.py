import git

def get_diff():
    repo = git.Repo(".")
    diff = repo.git.diff("HEAD")
    return diff

if __name__ == "__main__":
    diff = get_diff()
    if diff:
        print(diff)
    else:
        print("No changes detected")