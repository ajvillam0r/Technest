import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getAllUsers } from "@/lib/api";
import { Ban, CheckCircle, Edit, Trash2 } from "lucide-react";

export function AdminUsersList() {
  const [users, setUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleBanUser = (userId: string) => {
    // In a real app, you would call an API to ban the user
    console.log(`Ban user with ID: ${userId}`);
  };

  const handleDeleteUser = (userId: string) => {
    // In a real app, you would call an API to delete the user
    console.log(`Delete user with ID: ${userId}`);
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading users...</div>;
  }

  // If no real users are available, show mock data
  const mockUsers = [
    {
      id: "1",
      full_name: "John Doe",
      email: "john.doe@example.com",
      created_at: "2023-01-15T10:30:00Z",
      is_admin: false,
      is_banned: false,
      portfolios_count: 3,
    },
    {
      id: "2",
      full_name: "Jane Smith",
      email: "jane.smith@example.com",
      created_at: "2023-02-20T14:45:00Z",
      is_admin: true,
      is_banned: false,
      portfolios_count: 1,
    },
    {
      id: "3",
      full_name: "Bob Johnson",
      email: "bob.johnson@example.com",
      created_at: "2023-03-10T09:15:00Z",
      is_admin: false,
      is_banned: true,
      portfolios_count: 0,
    },
  ];

  const displayUsers = users.length > 0 ? users : mockUsers;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users Management</CardTitle>
        <CardDescription>
          Manage all users registered on the platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Portfolios</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.full_name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {new Date(user.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {user.is_banned ? (
                    <Badge variant="destructive">Banned</Badge>
                  ) : user.is_admin ? (
                    <Badge variant="default">Admin</Badge>
                  ) : (
                    <Badge variant="outline">Active</Badge>
                  )}
                </TableCell>
                <TableCell>{user.portfolios_count || 0}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {!user.is_banned ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleBanUser(user.id)}
                      >
                        <Ban className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleBanUser(user.id)}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
