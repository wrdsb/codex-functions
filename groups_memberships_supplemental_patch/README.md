# groups_memberships_ideal_patch
Perform a partial update of a Groups Memberships Ideal record. 
Only those attributes present in the Memberships object from the request payload are updated in the corresponding record in Codex. 
If no such record is present, a new record is created.

## Request
HTTP POST BODY

```json
{
    "group": "group@wrdsb.ca",
    "central": {
        "members": {
            "member1@wrdsb.ca": {
                "email": "member1@wrdsb.ca",
                "role": "MEMBER",
                "status": "ACTIVE",
                "type": "USER",
                "groupKey": "group@wrdsb.ca"
            },
            "member2@wrdsb.ca": {
                "email": "member2@wrdsb.ca",
                "role": "MEMBER",
                "status": "ACTIVE",
                "type": "USER",
                "groupKey": "group@wrdsb.ca"
            },
            "member3@wrdsb.ca": {
                "email": "member3@wrdsb.ca",
                "role": "MEMBER",
                "status": "ACTIVE",
                "type": "USER",
                "groupKey": "group@wrdsb.ca"
            }
        },
        "managers": {
            "manager1@wrdsb.ca": {
                "email": "manager1@wrdsb.ca",
                "role": "MANAGER",
                "status": "ACTIVE",
                "type": "USER",
                "groupKey": "group@wrdsb.ca"
            },
            "manager2@wrdsb.ca": {
                "email": "manager2@wrdsb.ca",
                "role": "MANAGER",
                "status": "ACTIVE",
                "type": "USER",
                "groupKey": "group@wrdsb.ca"
            },
            "manager3@wrdsb.ca": {
                "email": "manager3@wrdsb.ca",
                "role": "MANAGER",
                "status": "ACTIVE",
                "type": "USER",
                "groupKey": "group@wrdsb.ca"
            }
        },
        "owners": {
            "owner1@wrdsb.ca": {
                "email": "owner1@wrdsb.ca",
                "role": "OWNER",
                "status": "ACTIVE",
                "type": "USER",
                "groupKey": "group@wrdsb.ca"
            },
            "owner2@wrdsb.ca": {
                "email": "owner2@wrdsb.ca",
                "role": "OWNER",
                "status": "ACTIVE",
                "type": "USER",
                "groupKey": "group@wrdsb.ca"
            },
            "owner3@wrdsb.ca": {
                "email": "owner3@wrdsb.ca",
                "role": "OWNER",
                "status": "ACTIVE",
                "type": "USER",
                "groupKey": "group@wrdsb.ca"
            }
        }
    },
    "supplemental": {
        "members": {
            "member1@wrdsb.ca": {
                "email": "member1@wrdsb.ca",
                "role": "MEMBER",
                "status": "ACTIVE",
                "type": "USER",
                "groupKey": "group@wrdsb.ca"
            },
            "member2@wrdsb.ca": {
                "email": "member2@wrdsb.ca",
                "role": "MEMBER",
                "status": "ACTIVE",
                "type": "USER",
                "groupKey": "group@wrdsb.ca"
            },
            "member3@wrdsb.ca": {
                "email": "member3@wrdsb.ca",
                "role": "MEMBER",
                "status": "ACTIVE",
                "type": "USER",
                "groupKey": "group@wrdsb.ca"
            }
        },
        "managers": {
            "manager1@wrdsb.ca": {
                "email": "manager1@wrdsb.ca",
                "role": "MANAGER",
                "status": "ACTIVE",
                "type": "USER",
                "groupKey": "group@wrdsb.ca"
            },
            "manager2@wrdsb.ca": {
                "email": "manager2@wrdsb.ca",
                "role": "MANAGER",
                "status": "ACTIVE",
                "type": "USER",
                "groupKey": "group@wrdsb.ca"
            },
            "manager3@wrdsb.ca": {
                "email": "manager3@wrdsb.ca",
                "role": "MANAGER",
                "status": "ACTIVE",
                "type": "USER",
                "groupKey": "group@wrdsb.ca"
            }
        },
        "owners": {
            "owner1@wrdsb.ca": {
                "email": "owner1@wrdsb.ca",
                "role": "OWNER",
                "status": "ACTIVE",
                "type": "USER",
                "groupKey": "group@wrdsb.ca"
            },
            "owner2@wrdsb.ca": {
                "email": "owner2@wrdsb.ca",
                "role": "OWNER",
                "status": "ACTIVE",
                "type": "USER",
                "groupKey": "group@wrdsb.ca"
            },
            "owner3@wrdsb.ca": {
                "email": "owner3@wrdsb.ca",
                "role": "OWNER",
                "status": "ACTIVE",
                "type": "USER",
                "groupKey": "group@wrdsb.ca"
            }
        }
    },
    "ipps": {
        "members": {
            "member1@wrdsb.ca": {
                "email": "member1@wrdsb.ca",
                "role": "MEMBER",
                "status": "ACTIVE",
                "type": "USER",
                "groupKey": "group@wrdsb.ca"
            },
            "member2@wrdsb.ca": {
                "email": "member2@wrdsb.ca",
                "role": "MEMBER",
                "status": "ACTIVE",
                "type": "USER",
                "groupKey": "group@wrdsb.ca"
            },
            "member3@wrdsb.ca": {
                "email": "member3@wrdsb.ca",
                "role": "MEMBER",
                "status": "ACTIVE",
                "type": "USER",
                "groupKey": "group@wrdsb.ca"
            }
        },
        "managers": {
            "manager1@wrdsb.ca": {
                "email": "manager1@wrdsb.ca",
                "role": "MANAGER",
                "status": "ACTIVE",
                "type": "USER",
                "groupKey": "group@wrdsb.ca"
            },
            "manager2@wrdsb.ca": {
                "email": "manager2@wrdsb.ca",
                "role": "MANAGER",
                "status": "ACTIVE",
                "type": "USER",
                "groupKey": "group@wrdsb.ca"
            },
            "manager3@wrdsb.ca": {
                "email": "manager3@wrdsb.ca",
                "role": "MANAGER",
                "status": "ACTIVE",
                "type": "USER",
                "groupKey": "group@wrdsb.ca"
            }
        },
        "owners": {
            "owner1@wrdsb.ca": {
                "email": "owner1@wrdsb.ca",
                "role": "OWNER",
                "status": "ACTIVE",
                "type": "USER",
                "groupKey": "group@wrdsb.ca"
            },
            "owner2@wrdsb.ca": {
                "email": "owner2@wrdsb.ca",
                "role": "OWNER",
                "status": "ACTIVE",
                "type": "USER",
                "groupKey": "group@wrdsb.ca"
            },
            "owner3@wrdsb.ca": {
                "email": "owner3@wrdsb.ca",
                "role": "OWNER",
                "status": "ACTIVE",
                "type": "USER",
                "groupKey": "group@wrdsb.ca"
            }
        }
    }
}
```

## Response
