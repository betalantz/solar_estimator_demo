import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


const SummaryCard = ({ icon: Icon, arrow: Arrow, title, value }: { 
    icon: React.ElementType; 
    arrow: React.ElementType; 
    title: string; 
    value: string; 
  }) => (
    <Card className="bg-blue-50 border-blue-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <Icon className="text-blue-500" />
          <Arrow className="text-green-500" />
        </div>
        <p className="text-sm text-blue-600 mt-2">{title}</p>
        <p className="text-2xl font-bold text-blue-700">{value}</p>
      </CardContent>
    </Card>
  );

  export { SummaryCard }