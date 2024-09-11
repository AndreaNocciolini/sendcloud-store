At the moment, I just put the endpoint to retrieve outgoing returns.

Before continuing with the project, something must be done:

- Install Sinclair TypeBox;
- Check if I can make more generic code for helpers;
- Change method for SC API endpoint that need query from GET to POST (check getReturnsPortalOutgoingParcels() to see how I've done it);
- OPTIONAL: create README.md;

After, I can continue with the project from here: https://api.sendcloud.dev/docs/sendcloud-public-api/return-portal/operations/create-a-brand-return-portal-incoming

Right now, the project miss the following SC API:

##################################################
RETURN
- Create a Return (page linked just above);
- Apply Return Rules;
- Retrieve the status of a return;
- Create a file upload for return portal;
##################################################

##################################################
INTEGRATIONS AND SHIPMENT:

INTEGRATIONS:
- Retrieve a list of integrations;
- Retrieve an integration;
- Update an integration (PUT);
- Update an integration (PATCH);
- Delete an integration;
- Retrieve all integration expcetions logs;
- Retrieve integration expception logs;
- Create integration exceptions logs; (WTF)

SHIPMENTS:
- Retrieve a list of shipments;
- Create or update a list of shipments;
- Delete a shipment;
##################################################

##################################################
SERVICE POINTS:
- Retrieve a list of service points;
- Retrieve a service point;
- Retrieve availability of a service point;
- Retrieve a list of service points carriers;
##################################################

##################################################
ACCOUNT DETAIL:

BRANDS:
- Retrieve a list of brands;
- Retrive a brand;

INVOICES:
- Retrieve all invoices that have been issued to your account;
- Retrieve a specific invoice;

REPORTS:
- Create Parcels Report;
- Retrieve Parcels Report;

USERS:
- Retrieve the current user data;
##################################################