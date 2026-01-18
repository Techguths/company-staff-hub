import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Building2, Users, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('company');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password, selectedRole);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/10 p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo & Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-primary-foreground shadow-lg">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">QiraatCloud</h1>
          <p className="text-muted-foreground">Quran Learning Management Platform</p>
        </div>

        <Card className="border-0 shadow-xl">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Sign in to access your portal
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Role Selector */}
            <div className="mb-6">
              <Label className="text-sm font-medium mb-3 block">Login as</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedRole('company')}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200",
                    selectedRole === 'company'
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border bg-card hover:border-primary/50 text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Building2 className="w-6 h-6" />
                  <span className="font-medium text-sm">Company</span>
                  <span className="text-xs opacity-70">Full Access</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('staff')}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200",
                    selectedRole === 'staff'
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border bg-card hover:border-primary/50 text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Users className="w-6 h-6" />
                  <span className="font-medium text-sm">Staff</span>
                  <span className="text-xs opacity-70">Limited Access</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full h-11 text-base font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  `Sign in as ${selectedRole === 'company' ? 'Company Admin' : 'Staff Member'}`
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot your password?
              </a>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          © 2024 QiraatCloud. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
