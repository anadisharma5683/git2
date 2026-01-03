import { Briefcase, MapPin, IndianRupee, Clock, Calendar } from 'lucide-react';
import { Opportunity } from '../mockData';

interface OpportunityCardProps {
  opportunity: Opportunity;
  onApply: (id: string) => void;
}

const OpportunityCard = ({ opportunity, onApply }: OpportunityCardProps) => {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl p-6 shadow-lg border border-zinc-200 dark:border-zinc-700 hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Briefcase className="text-blue-500" size={20} />
            <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">{opportunity.role}</h3>
          </div>
          <h4 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">{opportunity.companyName}</h4>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          opportunity.type === 'internship' 
            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' 
            : 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300'
        }`}>
          {opportunity.type.charAt(0).toUpperCase() + opportunity.type.slice(1)}
        </span>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-center text-zinc-600 dark:text-zinc-400">
          <MapPin size={16} className="mr-2" />
          <span>{opportunity.location}</span>
        </div>
        
        <div className="flex items-center text-zinc-600 dark:text-zinc-400">
          <IndianRupee size={16} className="mr-2" />
          <span>{opportunity.stipend}</span>
        </div>
        
        <div className="flex items-center text-zinc-600 dark:text-zinc-400">
          <Calendar size={16} className="mr-2" />
          <span>Posted: {new Date(opportunity.postedDate).toLocaleDateString()}</span>
        </div>
        
        <div className="flex items-center text-zinc-600 dark:text-zinc-400">
          <Clock size={16} className="mr-2" />
          <span>Deadline: {new Date(opportunity.deadline).toLocaleDateString()}</span>
        </div>
      </div>

      <p className="mt-4 text-zinc-700 dark:text-zinc-300 line-clamp-2">
        {opportunity.description}
      </p>

      <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
        <h5 className="font-medium text-zinc-800 dark:text-zinc-200 mb-2">Requirements:</h5>
        <div className="flex flex-wrap gap-2">
          {opportunity.requirements.map((req, index) => (
            <span 
              key={index} 
              className="px-2 py-1 bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs rounded-md"
            >
              {req}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={() => onApply(opportunity.id)}
        className="mt-6 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium"
      >
        Apply Now
      </button>
    </div>
  );
};

export default OpportunityCard;