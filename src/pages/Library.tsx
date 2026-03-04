import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Plus, FileText, Upload, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ReadingItem {
  title: string;
  category: string;
  reads: number;
  fileName?: string;
}

const initialItems: ReadingItem[] = [
  { title: "Understanding Burnout", category: "Stress", reads: 892 },
  { title: "Sleep Hygiene 101", category: "Sleep", reads: 756 },
  { title: "Building Emotional Intelligence", category: "Leadership", reads: 634 },
  { title: "Managing Work-Life Balance", category: "Wellbeing", reads: 543 },
  { title: "Recognizing Anxiety Signs", category: "Anxiety", reads: 412 },
  { title: "The Power of Gratitude", category: "Mindfulness", reads: 389 },
];

const Library = () => {
  const [items, setItems] = useState<ReadingItem[]>(initialItems);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      toast({ title: "Invalid file", description: "Please select a PDF file.", variant: "destructive" });
    }
  };

  const handleAdd = () => {
    if (!title.trim() || !category.trim() || !selectedFile) {
      toast({ title: "Missing fields", description: "Please fill in all fields and upload a PDF.", variant: "destructive" });
      return;
    }
    setItems((prev) => [
      { title: title.trim(), category: category.trim(), reads: 0, fileName: selectedFile.name },
      ...prev,
    ]);
    toast({ title: "Item added", description: `"${title.trim()}" has been added to the library.` });
    setTitle("");
    setCategory("");
    setSelectedFile(null);
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Library</h1>
          <p className="text-muted-foreground mt-1">Curated reading materials for your organization.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Add Reading
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Reading Material</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="e.g. Managing Workplace Anxiety" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" placeholder="e.g. Stress, Sleep, Mindfulness" value={category} onChange={(e) => setCategory(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>PDF File</Label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {selectedFile ? (
                  <div className="flex items-center gap-2 p-3 border rounded-md bg-secondary/50">
                    <FileText className="h-4 w-4 text-primary shrink-0" />
                    <span className="text-sm truncate flex-1">{selectedFile.name}</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setSelectedFile(null)}>
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full gap-2 h-20 border-dashed"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-5 w-5 text-muted-foreground" />
                    <span className="text-muted-foreground">Click to upload PDF</span>
                  </Button>
                )}
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleAdd}>Add to Library</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, i) => (
          <Card key={`${item.title}-${i}`} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center">
                  {item.fileName ? <FileText className="h-5 w-5 text-primary" /> : <BookOpen className="h-5 w-5 text-primary" />}
                </div>
                <Badge variant="outline">Reading</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-base mb-2">{item.title}</CardTitle>
              <div className="flex items-center justify-between">
                <Badge variant="secondary">{item.category}</Badge>
                <span className="text-xs text-muted-foreground">{item.reads} reads</span>
              </div>
              {item.fileName && (
                <p className="text-xs text-muted-foreground mt-2 truncate">📄 {item.fileName}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Library;
