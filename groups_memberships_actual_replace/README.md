# groups_memberships_actual_replace
Perform a full update/create/replace of a Groups Memberhips Actual record. 
The Membership object in the request payload completely replaces the corresponding record in Codex.
If no such record exists, a new record is created.

## Request
HTTP POST BODY:

```json
{
    "group": "group@wrdsb.ca",
    "actual": {
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
