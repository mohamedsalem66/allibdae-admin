import React, { ReactNode } from "react";

// Props for Table
interface TableProps {
  children: ReactNode; // Table content (thead, tbody, etc.)
  className?: string; // Optional className for styling
}

// Props for TableHeader
interface TableHeaderProps {
  children: ReactNode; // Header row(s)
  className?: string; // Optional className for styling
}

// Props for TableBody
interface TableBodyProps {
  children: ReactNode; // Body row(s)
  className?: string; // Optional className for styling
}

// Props for TableRow
interface TableRowProps {
  children: ReactNode; // Cells (th or td)
  className?: string; // Optional className for styling
  hover?: boolean; // Enable hover effect
}

// Props for TableCell
interface TableCellProps {
  children: ReactNode; // Cell content
  isHeader?: boolean; // If true, renders as <th>, otherwise <td>
  className?: string; // Optional className for styling
}

// Table Component - Modern design with rounded corners and shadow
const Table: React.FC<TableProps> = ({ children, className }) => {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-theme-sm">
      <div className="overflow-x-auto custom-scrollbar">
        <table className={`min-w-full divide-y divide-gray-200 dark:divide-gray-800 ${className}`}>
          {children}
        </table>
      </div>
    </div>
  );
};

// TableHeader Component - Modern header with gradient background
const TableHeader: React.FC<TableHeaderProps> = ({ children, className }) => {
  return (
    <thead className={`bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-800 dark:to-gray-800/50 ${className}`}>
      {children}
    </thead>
  );
};

// TableBody Component - Modern body with alternating rows
const TableBody: React.FC<TableBodyProps> = ({ children, className }) => {
  return (
    <tbody className={`divide-y divide-gray-200 dark:divide-gray-800 bg-white dark:bg-gray-900 ${className}`}>
      {children}
    </tbody>
  );
};

// TableRow Component - Modern row with hover effects
const TableRow: React.FC<TableRowProps> = ({ children, className, hover = true }) => {
  const hoverClass = hover 
    ? "transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:shadow-sm" 
    : "";
  return (
    <tr className={`${hoverClass} ${className || ""}`}>
      {children}
    </tr>
  );
};

// TableCell Component - Modern cell with proper padding and typography
const TableCell: React.FC<TableCellProps> = ({
  children,
  isHeader = false,
  className,
}) => {
  const CellTag = isHeader ? "th" : "td";
  const baseClasses = isHeader
    ? "px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
    : "px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100";
  
  return (
    <CellTag className={`${baseClasses} ${className || ""}`}>
      {children}
    </CellTag>
  );
};

export { Table, TableHeader, TableBody, TableRow, TableCell };
