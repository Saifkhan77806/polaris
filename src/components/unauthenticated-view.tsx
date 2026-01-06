import React from "react";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "./ui/item";
import { ShieldAlertIcon } from "lucide-react";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

const Unauthenticatedview = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="w-full max-w-lg bg-muted">
        <Item variant={"outline"}>
          <ItemMedia>
            <ShieldAlertIcon />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>Unauthorized Access</ItemTitle>
            <ItemDescription>
              You are not authorized to access this resource.
            </ItemDescription>
          </ItemContent>
          <ItemActions>
            <SignInButton>
                <Button variant={"outline"}>
                    Sign In
                </Button>
            </SignInButton>
          </ItemActions>
        </Item>
      </div>
    </div>
  );
};

export default Unauthenticatedview;
