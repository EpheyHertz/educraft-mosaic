
import { useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, Bell, Lock, User, Moon, Sun, Palette, Globe, Eye, Save } from 'lucide-react';
import { toast } from 'sonner';

const Settings = () => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('account');
  
  // Settings state
  const [accountSettings, setAccountSettings] = useState({
    name: currentUser?.name || 'User',
    email: currentUser?.email || 'user@example.com',
    password: '********',
    language: 'english',
    theme: 'light',
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    assignmentReminders: true,
    courseAnnouncements: true,
    gradingUpdates: true,
    systemUpdates: false,
  });
  
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'all',
    showGrades: true,
    showEnrolledCourses: true,
    showAchievements: true,
    allowDataCollection: true,
  });

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Handle account settings update
  const handleAccountUpdate = (e) => {
    e.preventDefault();
    toast.success('Account settings updated successfully!');
  };

  // Handle notification toggle
  const handleNotificationToggle = (setting) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  // Handle privacy settings update
  const handlePrivacyUpdate = (e) => {
    e.preventDefault();
    toast.success('Privacy settings updated successfully!');
  };

  // Handle account deletion
  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );
    
    if (confirmed) {
      logout();
      toast.success('Your account has been deleted.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-500">Manage your account settings and preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <Tabs 
            orientation="vertical" 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="w-full"
          >
            <TabsList className="flex flex-col h-auto items-stretch space-y-1 bg-transparent">
              <TabsTrigger 
                value="account" 
                className="justify-start text-left px-3 py-2 data-[state=active]:bg-muted"
              >
                <User className="h-4 w-4 mr-2" />
                Account
              </TabsTrigger>
              <TabsTrigger 
                value="notifications" 
                className="justify-start text-left px-3 py-2 data-[state=active]:bg-muted"
              >
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger 
                value="appearance" 
                className="justify-start text-left px-3 py-2 data-[state=active]:bg-muted"
              >
                <Palette className="h-4 w-4 mr-2" />
                Appearance
              </TabsTrigger>
              <TabsTrigger 
                value="privacy" 
                className="justify-start text-left px-3 py-2 data-[state=active]:bg-muted"
              >
                <Lock className="h-4 w-4 mr-2" />
                Privacy
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Main content */}
        <div className="md:col-span-3">
          <TabsContent value="account" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account information and preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAccountUpdate}>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input 
                            id="name" 
                            value={accountSettings.name} 
                            onChange={(e) => setAccountSettings({...accountSettings, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            value={accountSettings.email} 
                            onChange={(e) => setAccountSettings({...accountSettings, email: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Password</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input id="currentPassword" type="password" value={accountSettings.password} readOnly />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input id="newPassword" type="password" placeholder="Enter new password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Preferences</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="language">Language</Label>
                          <Select 
                            value={accountSettings.language} 
                            onValueChange={(value) => setAccountSettings({...accountSettings, language: value})}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="english">English</SelectItem>
                              <SelectItem value="spanish">Spanish</SelectItem>
                              <SelectItem value="french">French</SelectItem>
                              <SelectItem value="german">German</SelectItem>
                              <SelectItem value="chinese">Chinese</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full" type="submit">Save Changes</Button>
                  </div>
                </form>
              </CardContent>

              <Separator className="my-4" />

              <CardFooter className="flex flex-col space-y-4">
                <div className="w-full">
                  <h3 className="text-lg font-medium text-red-600 mb-2">Danger Zone</h3>
                  <p className="text-sm text-gray-500 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                  <Button variant="destructive" onClick={handleDeleteAccount}>
                    Delete Account
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Control how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Communication Channels</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-notifications">Email Notifications</Label>
                          <p className="text-sm text-gray-500">Receive notifications via email</p>
                        </div>
                        <Switch 
                          id="email-notifications" 
                          checked={notificationSettings.emailNotifications}
                          onCheckedChange={() => handleNotificationToggle('emailNotifications')}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="sms-notifications">SMS Notifications</Label>
                          <p className="text-sm text-gray-500">Receive notifications via text message</p>
                        </div>
                        <Switch 
                          id="sms-notifications" 
                          checked={notificationSettings.smsNotifications}
                          onCheckedChange={() => handleNotificationToggle('smsNotifications')}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notification Types</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="assignment-reminders">Assignment Reminders</Label>
                          <p className="text-sm text-gray-500">Get notified about upcoming assignments and deadlines</p>
                        </div>
                        <Switch 
                          id="assignment-reminders" 
                          checked={notificationSettings.assignmentReminders}
                          onCheckedChange={() => handleNotificationToggle('assignmentReminders')}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="course-announcements">Course Announcements</Label>
                          <p className="text-sm text-gray-500">Get notified about announcements from your courses</p>
                        </div>
                        <Switch 
                          id="course-announcements" 
                          checked={notificationSettings.courseAnnouncements}
                          onCheckedChange={() => handleNotificationToggle('courseAnnouncements')}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="grading-updates">Grading Updates</Label>
                          <p className="text-sm text-gray-500">Get notified when new grades are posted</p>
                        </div>
                        <Switch 
                          id="grading-updates" 
                          checked={notificationSettings.gradingUpdates}
                          onCheckedChange={() => handleNotificationToggle('gradingUpdates')}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="system-updates">System Updates</Label>
                          <p className="text-sm text-gray-500">Get notified about system maintenance and updates</p>
                        </div>
                        <Switch 
                          id="system-updates" 
                          checked={notificationSettings.systemUpdates}
                          onCheckedChange={() => handleNotificationToggle('systemUpdates')}
                        />
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={() => toast.success('Notification settings saved!')}
                    className="w-full"
                  >
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>Customize how the application looks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Theme</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors ${
                          accountSettings.theme === 'light' ? 'border-primary bg-primary/5' : ''
                        }`}
                        onClick={() => setAccountSettings({...accountSettings, theme: 'light'})}
                      >
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <Sun className="h-6 w-6" />
                          <span>Light Mode</span>
                        </div>
                      </div>
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors ${
                          accountSettings.theme === 'dark' ? 'border-primary bg-primary/5' : ''
                        }`}
                        onClick={() => setAccountSettings({...accountSettings, theme: 'dark'})}
                      >
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <Moon className="h-6 w-6" />
                          <span>Dark Mode</span>
                        </div>
                      </div>
                      <div 
                        className={`border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors ${
                          accountSettings.theme === 'system' ? 'border-primary bg-primary/5' : ''
                        }`}
                        onClick={() => setAccountSettings({...accountSettings, theme: 'system'})}
                      >
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <div className="flex">
                            <Sun className="h-5 w-5" />
                            <Moon className="h-5 w-5" />
                          </div>
                          <span>System Default</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Font Size</h3>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="font-size" className="text-xs">A</Label>
                      <input
                        id="font-size"
                        type="range"
                        min="12"
                        max="24"
                        step="2"
                        defaultValue="16"
                        className="w-full"
                      />
                      <Label htmlFor="font-size" className="text-lg">A</Label>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Accent Color</h3>
                    <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                      {['blue', 'green', 'purple', 'orange', 'pink'].map((color) => (
                        <div 
                          key={color}
                          className={`h-10 rounded-md cursor-pointer border-2 transition-all ${
                            color === 'blue' ? 'bg-blue-500 border-blue-600' :
                            color === 'green' ? 'bg-green-500 border-green-600' :
                            color === 'purple' ? 'bg-purple-500 border-purple-600' :
                            color === 'orange' ? 'bg-orange-500 border-orange-600' :
                            'bg-pink-500 border-pink-600'
                          }`}
                          title={color.charAt(0).toUpperCase() + color.slice(1)}
                        ></div>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={() => toast.success('Appearance settings saved!')}
                    className="w-full"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Appearance Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>Control who can see your information and how your data is used</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePrivacyUpdate}>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Profile Visibility</h3>
                      <div className="space-y-2">
                        <Label htmlFor="profileVisibility">Who can see your profile?</Label>
                        <Select 
                          value={privacySettings.profileVisibility}
                          onValueChange={(value) => setPrivacySettings({...privacySettings, profileVisibility: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select visibility" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Everyone</SelectItem>
                            <SelectItem value="school">School Members Only</SelectItem>
                            <SelectItem value="courses">My Courses Only</SelectItem>
                            <SelectItem value="none">Only Me</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="pt-2 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="show-grades">Show Grades</Label>
                            <p className="text-sm text-gray-500">Allow others to see your grades</p>
                          </div>
                          <Switch 
                            id="show-grades" 
                            checked={privacySettings.showGrades}
                            onCheckedChange={() => setPrivacySettings({...privacySettings, showGrades: !privacySettings.showGrades})}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="show-courses">Show Enrolled Courses</Label>
                            <p className="text-sm text-gray-500">Allow others to see courses you're enrolled in</p>
                          </div>
                          <Switch 
                            id="show-courses" 
                            checked={privacySettings.showEnrolledCourses}
                            onCheckedChange={() => setPrivacySettings({...privacySettings, showEnrolledCourses: !privacySettings.showEnrolledCourses})}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="show-achievements">Show Achievements</Label>
                            <p className="text-sm text-gray-500">Allow others to see your achievements</p>
                          </div>
                          <Switch 
                            id="show-achievements" 
                            checked={privacySettings.showAchievements}
                            onCheckedChange={() => setPrivacySettings({...privacySettings, showAchievements: !privacySettings.showAchievements})}
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Data Usage</h3>
                      <div className="bg-amber-50 border border-amber-200 rounded-md p-4 flex items-start">
                        <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-amber-800">
                          We collect anonymized usage data to improve your experience. You can opt out below, but some features may be limited.
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <div className="space-y-0.5">
                          <Label htmlFor="data-collection">Allow Data Collection</Label>
                          <p className="text-sm text-gray-500">Help improve the platform by sharing usage data</p>
                        </div>
                        <Switch 
                          id="data-collection" 
                          checked={privacySettings.allowDataCollection}
                          onCheckedChange={() => setPrivacySettings({...privacySettings, allowDataCollection: !privacySettings.allowDataCollection})}
                        />
                      </div>
                    </div>

                    <Button className="w-full" type="submit">Save Privacy Settings</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </div>
    </div>
  );
};

export default Settings;
